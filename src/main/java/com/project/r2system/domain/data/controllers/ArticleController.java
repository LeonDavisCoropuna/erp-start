package com.project.r2system.domain.data.controllers;


import com.project.r2system.api.commons.ArticleMapping;
import com.project.r2system.domain.data.entities.Article;
import com.project.r2system.domain.data.payloads.responses.ArticleResponse;
import com.project.r2system.domain.data.services.ArticleService;
import com.project.r2system.domain.data.services.CategoryService;
import com.project.r2system.domain.data.services.MeasureService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/data/articles")
public class ArticleController {
    @Autowired
    private ArticleService articleService;
    
    @Autowired
    private ArticleMapping articleMapping;
    
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private MeasureService measureService;

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<?>> getAllArticles()
    {
        List<Article> articles = articleService.allArticles();
        if (articles.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        List<ArticleResponse> DTO = new ArrayList<>();
        for (Article article : articles) {
            DTO.add(articleMapping.maptoReponse(article));
        }
        return new ResponseEntity<>(DTO, HttpStatus.OK);
    }

    @GetMapping("/{idN}")
    public ResponseEntity<ArticleResponse> getArticleById(@PathVariable Integer idN) {
        Article article = articleService.ArticleById(idN);
        if (article != null) {
            return new ResponseEntity<>(articleMapping.maptoReponse(article), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createArticle(@RequestBody ArticleResponse articleResponse) {
        Article article = articleMapping.createFromRequest(articleResponse);
        String state = articleService.createArticle(article);
        if(state != "OK"){
            return new ResponseEntity<String>(state, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{idN}")
    public ResponseEntity<?> updateArticle(@PathVariable Integer idN, @RequestBody ArticleResponse updatedArticle) {
        try {
            String createdArticle = articleService.updateArticle(idN,updatedArticle);
            if(createdArticle == "NOT_FOUND"){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<String>(createdArticle, HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") Integer idN) {
        try {
            articleService.deleteByIdN(idN);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}