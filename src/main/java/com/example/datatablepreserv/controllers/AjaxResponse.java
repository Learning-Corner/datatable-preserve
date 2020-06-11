package com.example.datatablepreserv.controllers;

/**
 * AjaxResponse wrapper
 * This is to wrap data returned to the DataTable
 */
public class AjaxResponse {

    /**
     * Response data
     */
    final Object data;

    public Object getData() {
        return data;
    }

    /**
     * Constructor
     * @param data : Response data
     */
    public AjaxResponse(Object data) {
        this.data = data;
    }
}
