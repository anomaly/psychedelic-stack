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
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  EchoResponse,
  HealthCheckResponse
} from '.././models'



  /**
 * Echo back a response to say hello.

Purpose of this endpoint is to echo back what was received, this merely
validated that the server is up and running.
 * @summary Echo
 */
export const echo = <TData = AxiosResponse<EchoResponse>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/ext/echo`,options
    );
  }
/**
 * Check the health of the server.

Purpose of this endpoint is to check the health of the server.
We check for connection to the database, queue and logger
 * @summary Get Health
 */
export const getHealth = <TData = AxiosResponse<HealthCheckResponse>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `/ext/healthcheck`,options
    );
  }
export type EchoResult = AxiosResponse<EchoResponse>
export type GetHealthResult = AxiosResponse<HealthCheckResponse>
