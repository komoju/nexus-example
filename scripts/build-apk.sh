#! /usr/bin/env sh
( cd KomojuDemo/android ; ./gradlew assembleRelease)

cp KomojuDemo/android/app/build/outputs/apk/release/app-release.apk ./