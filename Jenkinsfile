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
        script {
          // Keep the pipeline going so reports can be published
          // even when one or more tests fail.
          catchError(
            buildResult: 'UNSTABLE',
            stageResult: 'UNSTABLE'
          ) {
            sh 'npx playwright test'
          }
        }
      }
    }
  }

  post {
    always {
      // Publish the Allure report from raw Allure results.
      allure([
        includeProperties: false,
        jdk: '',
        properties: [],
        reportBuildPolicy: 'ALWAYS',
        results: [
          [path: 'allure-results']
        ]
      ])

      // Archive the Playwright HTML report.
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