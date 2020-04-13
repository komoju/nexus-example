#! /usr/bin/env sh
( cd client/android ; ./gradlew assembleRelease)

cp client/android/app/build/outputs/apk/release/app-release.apk ./