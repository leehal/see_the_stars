package com.stars_back.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

public class Webcontroller implements ErrorController {
    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public ModelAndView saveLeadQuery() {
        return new ModelAndView("forward:/");
    }
}
