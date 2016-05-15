.PHONY: release clean copy_files build_package

SHELL := /bin/bash

PKG_NAME := wirejs
VERSION := $(shell node -p -e "require('./package.json').version")

DIST_DIR := dist

release: build_package

build_package: copy_files
	fpm -s dir -t deb -C ${DIST_DIR} --prefix=/ --name ${PKG_NAME} --version ${VERSION}

copy_files: clean
	mkdir -p ${DIST_DIR}/opt/${PKG_NAME}
	mkdir -p ${DIST_DIR}/etc/systemd/system
	cp -r package.json etc bin src node_modules ${DIST_DIR}/opt/${PKG_NAME}
	cp -r wirejs.service ${DIST_DIR}/etc/systemd/system

clean:
	rm -f ${PKG_NAME}*.deb
	rm -rf "${DIST_DIR}"