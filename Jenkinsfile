pipeline {
  agent any

  options {
    skipDefaultCheckout(true)
    disableConcurrentBuilds()
  }

  tools {
    nodejs 'NodeJS-20'
  }

  stages {
    stage('Clean Workspace') {
      steps {
        deleteDir()
      }
    }

    stage('Checkout Source') {
      steps {
        checkout scm
      }
    }

    stage('Verify Checkout') {
      steps {
        sh '''
          echo "Workspace:"
          pwd

          echo "Current commit:"
          git log -1 --oneline

          echo "Test files:"
          find tests -type f | sort
        '''
      }
    }

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

    stage('Clean Allure Results') {
      steps {
        sh '''
          rm -rf allure-results
          rm -rf allure-report
          mkdir -p allure-results

          echo "Allure directory after cleanup:"
          find allure-results -type f -print || true
        '''
      }
    }

    stage('Run Playwright Tests') {
      steps {
        script {
          catchError(
            buildResult: 'UNSTABLE',
            stageResult: 'UNSTABLE'
          ) {
            sh 'npx playwright test'
          }
        }
      }
    }

    stage('Inspect Allure Results') {
      steps {
        sh '''
          echo "Generated Allure files:"
          find allure-results -maxdepth 1 -type f -print

          echo "Checking for deleted example test:"
          grep -R "example.spec.js" allure-results || true
        '''
      }
    }
  }

  post {
    always {
      allure([
        includeProperties: false,
        jdk: '',
        properties: [],
        reportBuildPolicy: 'ALWAYS',
        results: [
          [path: 'allure-results']
        ]
      ])

      junit(
        testResults: 'test-results/results.xml',
        allowEmptyResults: true
      )

      archiveArtifacts(
        artifacts: 'playwright-report/**',
        allowEmptyArchive: true
      )

      archiveArtifacts(
        artifacts: 'test-results/**',
        allowEmptyArchive: true
      )
    }

    cleanup {
      deleteDir()
    }
  }
}