@Library('defra-library@v-8') _

def runAcceptanceTests = {
  stage('Run acceptance tests') {
    try {
      dir('test/acceptance') {
        pwd
        sh('mkdir -p -m 777 html-reports')
        // URL for running application - hard coding this to be PR specific for now
        withEnv(['TEST_ENVIRONMENT_ROOT_URL=https://ffc-demo-pr174.ffc.snd.azure.defra.cloud']) {
          sh('docker-compose up --build --abort-on-container-exit')
        }
      }
    } finally {
      sh('docker-compose down -v')
    }
  }
}

buildNodeJs environment: 'dev', deployClosure: runAcceptanceTests