node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Build Docker test'){
     sh 'docker build -t react-test --no-cache .'
    }
     stage('Docker test'){
      sh 'docker run --rm react-test'
    }
    stage('Deploy'){
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build -t react-app --no-cache .'
        sh 'docker tag react-app localhost:3000'
        sh 'docker push localhost:3000'
        sh 'docker rmi -f react-app localhost:3000'
      }
    }
  }
  catch (err) {
    throw err
  }
}