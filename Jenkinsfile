def registry = '562955126301.dkr.ecr.eu-west-2.amazonaws.com'
def imageName = 'ffc-demo-web'
def repoName = 'ffc-demo-web'
def branch = ''
def pr = ''
def containerTag = ''
def namespace = ''

def buildTestImage(name, suffix) {
  sh 'docker image prune -f'
  // NOTE: the docker-compose file currently makes use of env vars for image names
  sh "docker-compose -p $name-$suffix -f docker-compose.yaml -f docker-compose.test.yaml build --no-cache $name"
}

def runTests(name, suffix) {
  try {
    sh 'mkdir -p test-output'
    sh 'chmod 777 test-output'
    sh "docker-compose -p $name-$suffix -f docker-compose.yaml -f docker-compose.test.yaml up $name"

  } finally {
    sh "docker-compose -p $name-$suffix -f docker-compose.yaml -f docker-compose.test.yaml down -v"
    junit 'test-output/junit.xml'
    // clean up files created by node/ubuntu user
    sh "docker run -u node --mount type=bind,source=$WORKSPACE/test-output,target=/usr/src/app/test-output $name rm -rf test-output/*"
  }
}

node {
  checkout scm
  stage('Set branch, PR, containerTag, and namespace variables') {
    branch = sh(returnStdout: true, script: 'git ls-remote --heads origin | grep $(git rev-parse HEAD) | cut -d / -f 3').trim()
    pr = sh(returnStdout: true, script: "curl https://api.github.com/repos/DEFRA/ffc-demo-web/pulls?state=open | jq '.[] | select(.head.ref | contains(\"$branch\")) | .number'").trim()
    def rawTag = pr == '' ? branch : pr
    containerTag = rawTag.replaceAll(/[^a-zA-Z0-9]/, '-').toLowerCase()
    namespace = "${imageName}-${containerTag}"
  }
  docker.withRegistry("https://$registry", 'ecr:eu-west-2:ecr-user') {
    stage('Build test image') {
      buildTestImage(imageName, BUILD_NUMBER)
    }
    stage('Run tests') {
       runTests(imageName, BUILD_NUMBER)
    }
    stage('Push container image') {
      sh "docker-compose build --no-cache"
      sh "docker tag $imageName $registry/$imageName:$containerTag"
      sh "docker push $registry/$imageName:$containerTag"
    }
    if (pr != '') {
      stage('Helm install') {
        withKubeConfig([credentialsId: 'awskubeconfig002']) {
          sh "helm upgrade $imageName-$containerTag --install --namespace $namespace --values ./helm/ffc-demo-web/jenkins-aws.yaml ./helm/ffc-demo-web --set image=$registry/$imageName:$containerTag,name=ffc-demo-$containerTag,ingress.endpoint=ffc-demo-$containerTag"
        }
      }
    }
    if (pr == '') {
      stage('Publish chart') {
        // jenkins doesn't tidy up folder, remove old charts before running
        sh "rm -rf helm-charts"
        sh "echo $PR"
        sshagent(credentials: ['helm-chart-creds']) {
          sh "git clone git@gitlab.ffc.aws-int.defra.cloud:helm/helm-charts.git"
          dir('helm-charts') {
            sh 'helm init -c'
            sh 'helm package ../helm/ffc-demo-web'
            sh 'helm repo index .'
            sh 'git config --global user.email "buildserver@defra.gov.uk"'
            sh 'git config --global user.name "buildserver"'
            sh 'git checkout master'
            sh 'git add -A'
            sh 'git commit -m "update helm chart from build job"'
            sh 'git push'
          }
        }
      }
    }
  }
}

