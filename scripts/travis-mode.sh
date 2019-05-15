#!/bin/bash

is_lint() {
    [[ "${PHASE}" = lint ]]
}

is_unit() {
    [[ "${PHASE}" = unit ]]
}

is_build() {
    [[ "${PHASE}" = build ]]
}

is_publish() {
    [[ "${PHASE}" = publish ]]
}

is_publish_dev() {
    [[ "${PHASE}" = publishdev ]]
}
