import test from 'node:test';
import assert from 'node:assert/strict';
import {formatGrade,validateStudent,validateCourse} from './logic.js';
test('normaliza una nota a escala vigesimal',()=>assert.equal(formatGrade(15,20),15));
test('rechaza una nota mayor al máximo',()=>assert.throws(()=>formatGrade(21,20)));
test('valida estudiante y correo',()=>{assert.equal(validateStudent({code:'2026001',firstName:'Ana',lastName:'Ríos',email:'ana@upla.edu',program:'Sistemas'}),true);assert.throws(()=>validateStudent({code:'x',email:'mal'}));});
test('valida créditos del curso',()=>{assert.equal(validateCourse({code:'SIS1',name:'Java',credits:4}),true);assert.throws(()=>validateCourse({code:'SIS1',name:'Java',credits:30}));});
