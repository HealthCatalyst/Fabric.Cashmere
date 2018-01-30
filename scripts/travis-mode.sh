#!/bin/bash

is_lint() {
    [[ "${PHASE}" = lint ]]
}

is_aot() {
    [[ "${PHASE}" = aot ]]
}

is_unit() {
    [[ "${PHASE}" = unit ]]
}

is_e2e() {
    [[ "${PHASE}" = e2e ]]
}

is_lib_build() {
    [[ "${PHASE}" = lib_build ]]
}