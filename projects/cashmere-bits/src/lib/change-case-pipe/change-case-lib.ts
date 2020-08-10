import {InjectionToken} from '@angular/core';
import * as changeCaseLib from 'change-case';

export const changeCase = changeCaseLib;
export type ChangeCaseLib = typeof changeCaseLib;
export const CHANGE_CASE = new InjectionToken('change-case');
