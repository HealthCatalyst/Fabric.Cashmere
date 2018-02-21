#!/bin/bash

is_lint() {
    [[ "${PHASE}" = lint ]]
}

is_unit() {
    [[ "${PHASE}" = unit ]]
}

is_build_lib() {
    [[ "${PHASE}" = build_lib ]]
}

is_build_demo() {
    [[ "${PHASE}" = build_demo ]]
}
