package com.project.r2system.security.config;

import com.project.r2system.api.commons.*;
import com.project.r2system.security.jwt.JwtUtils;
import com.project.r2system.security.services.UserDetailsImpl;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    @Bean
    public JwtUtils jwtUtils(){return new JwtUtils();}
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
    @Bean
    public ArticleMapping articleMapping(){
        return new ArticleMapping();
    }
    @Bean
    public CategoryMapping categoryMapping(){
        return new CategoryMapping();
    }
    @Bean
    public WorkpowerMapping workpowerMapping(){
        return new WorkpowerMapping();
    }
    @Bean
    public BudgetMapping budgetMapping(){return new BudgetMapping();}
    @Bean
    public BudgetFormMapping budgetFromMapping(){return new BudgetFormMapping();}

}
