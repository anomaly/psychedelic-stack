/**
 * Generated by orval v6.16.0 🍺
 * Do not edit manually.
 * labs-api
 * 
        This project provides a reference Python API built using FastAPI, the 
        aim of the project is:

        - To maintain a good know source of habits
        - Demonstrate how applications are meant to be put together at Anomaly
        - Democratize design of robust API    
    
 * OpenAPI spec version: 0.1.0
 */
import {
  rest
} from 'msw'
import {
  faker
} from '@faker-js/faker'

export const getEchoMock = () => ({message: faker.random.word()})

export const getGetHealthMock = () => ({all_ok: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), db_ok: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), queue_ok: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]), timestamp: faker.helpers.arrayElement([`${faker.date.past().toISOString().split('.')[0]}Z`, undefined])})

export const getExtMSW = () => [
rest.get('*/ext/echo', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getEchoMock()),
        )
      }),rest.get('*/ext/healthcheck', (_req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getGetHealthMock()),
        )
      }),]