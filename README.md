# Proyecto base de ejemplo de ionic y firebase
Proyecto utilizado de ejemplo para el curso de Desarrollo de aplicaciones híbridas.

## FAQ
### ¿Qué es Ionic?
Ionic es un SDK (kit de desarrollo de software) de código abierto liberado bajo una licencia MIT. Esto significa que pueden utilizar Ionic en proyectos personales o comerciales de forma gratuita.

## Instalación
### Descargar VirtualBox:
* [Virtual Box](https://www.virtualbox.org/wiki/Downloads)

### Descargar una máquina virtual de Windows 10 para VirtualBox:
* [Windows 10](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/)

### Instalar Google Chrome
* [Google Chrome](http://www.chrome.com)

### Instalar Sublime Text con Package Control y Cobalt2 Theme (opcional)
* [Sublime Text 3](http://sublimetext.com)
* [Package Control](https://packagecontrol.io/installation)
* [Cobalt 2 Theme](http://wesbos.com/cobalt2-theme-sublime-text-2/) (opcional)
* Instalar Emmet desde "install package"

### Instalar Git
* [Git](https://git-scm.com/download/win)

### Instalar ConsoleZ (opcional)
* [ConsoleZ](https://github.com/cbucher/console) (opcional)

### Instalar NodeJS
* [NodeJS](http://nodejs.org/)

### Instalar cordova y ionic

```bash
sudo npm install -g cordova
sudo npm install -g ionic
```

### Instalar Java JDK
* [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

### Instalar Apache Ant
* [Apache Ant](http://ant.apache.org/bindownload.cgi)

### Instalar Android SDK

* [Android SDK](https://developer.android.com/studio/index.html)
### Seguir las instrucciones:
Windows users developing for Android: You'll want to make sure you have the following installed and set up.

####Documentación del sitio web de ionic:

NOTE: Whenever you make changes to the PATH, or any other environment variable, you'll need to restart or open a new tab in your shell program for the PATH change to take effect.

Java JDK

Install the most recent Java JDK (NOT just the JRE).

Next, create an environment variable for JAVA_HOME pointing to the root folder where the Java JDK was installed. So, if you installed the JDK into C:\Program Files\Java\jdk7, set JAVA_HOME to be this path. After that, add the JDK's bin directory to the PATH variable as well. Following the previous assumption, this should be either %JAVA_HOME%\bin or the full path C:\Program Files\Java\jdk7\bin

Apache Ant

To install Ant, download a zip from here, extract it, move the first folder in the zip to a safe place, and update your PATH to include the bin folder in that folder. For example, if you moved the Ant folder to c:/, you'd want to add this to your PATH: C:\apache-ant-1.9.2\bin.

Android SDK

Installing the Android SDK is also necessary. The Android SDK provides you the API libraries and developer tools necessary to build, test, and debug apps for Android.

Cordova requires the ANDROID_HOME environment variable to be set. This should point to the [ANDROID_SDK_DIR]\android-sdk directory (for example c:\android\android-sdk).

Next, update your PATH to include the tools/ and platform-tools/ folder in that folder. So, using ANDROID_HOME, you would add both %ANDROID_HOME%\tools and %ANDROID_HOME%\platform-tools.

### Instalar SDK de android

* SDK Tools
* SDK PlatformTools
* SDK BuildTools
* 6.0.0 SDK API 23
* Google USB Driver

### Crear el proyecto y no crear cuenta en ionic.io
```bash
ionic start buscacomida sidemenu
```

### Ingresar a la carpeta del proyecto y agregar android como plataforma
```bash
cd buscacomida
ionic platform add android
```

### Modificar el archivo package.json e instalar bower
El comando sudo solo es para máquinas en Linux o OSX
```bash
sudo npm install -g bower
```

### Instalar firebase
```bash
ionic add firebase
```

### Instalar angularfire y ngCordova
```bash
ionic add angularfire
ionic add ngCordova
```

### Instalar plugins de cordova y ionic
```bash
cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications.git
cordova plugin add https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
cordova plugin add cordova-plugin-vibration
cordova plugin add cordova-plugin-whitelist 
ionic plugin add cordova-plugin-inappbrowser
ionic add ng-cordova-oauth
bower install --save-dev jssha#1.6.0
```

### Cambiar información en package.json, bower.json y config.xml

### Lanzar la vista de lab
```bash
ionic serve --lab
```

### Utilizar Componentes de Ionic
* [Componentes de Ionic](http://ionicframework.com/docs/components/)

### Utilizar twitter para iniciar sesión
* [Twitter Apps](https://apps.twitter.com/)

