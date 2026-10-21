plugins {
    id("com.android.application")
}

android {
    namespace = "ru.belayamgla.app"
    compileSdk = 35

    defaultConfig {
        applicationId = "ru.belayamgla.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 4
        versionName = "4.0.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
