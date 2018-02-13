# Loopback Microservice template

A template project for writing loopback based microservices.  
The package contains some custom loopback npm packages to work with loopback in a microservice arcitecture. See the list below for further information.

## Overview

  1. [Testing](testing.md)
  1. [Docker](docker.md)

## Todo:

  - add a logger-component (environment specific)


## Overview of used custom loopback specific packages

- [loopback-microservice](https://github.com/joinbox/loopback-microservice)  
A thin wrapper for loopbback applications to simplify running and testing.
- [loopback-component-remote-microservice](https://github.com/joinbox/loopback-component-remote-microservice)  
Loopback component to expose and consume models of remote loopback applications.
- [loopback-component-angular-sdk](https://github.com/joinbox/loopback-component-angular-sdk)  
The [loopback angular SDK deliverd](https://loopback.io/doc/en/lb3/AngularJS-JavaScript-SDK.html) over an API endpoint.
- [loopback-component-relation-filter](https://github.com/joinbox/loopback-component-relation-filter)  
Enables where query filters on related loopback models.
- [loopback-component-permission-tree](https://github.com/joinbox/loopback-component-permission-tree)  
Get the current loppback users permissions from an API endpoint as a tree.
- [loopback-dummy-project](https://github.com/joinbox/loopback-dummy-project)  
A dummy loopback project with test data.
- [loopback-component-jb-migration](https://github.com/joinbox/loopback-component-jb-migration/tree/initial-setup)  
Loopback Prosgress SQL migrations.
