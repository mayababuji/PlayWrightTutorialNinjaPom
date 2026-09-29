pipeline {
  agent any

  tools {
    nodejs 'NodeJS-20'
  }

  stages {
    stage('Check Node and npm') {
      steps {
        sh 'node --version'
        sh 'npm --version'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Playwright Tests') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      // Archive the HTML report.
      archiveArtifacts(
        artifacts: 'playwright-report/**',
        allowEmptyArchive: true
      )

      // Archive traces, screenshots, videos, and other test results.
      archiveArtifacts(
        artifacts: 'test-results/**',
        allowEmptyArchive: true
      )

      // Publish JUnit results.
      junit(
        testResults: 'test-results/results.xml',
        allowEmptyResults: true
      )
    }
  }
}