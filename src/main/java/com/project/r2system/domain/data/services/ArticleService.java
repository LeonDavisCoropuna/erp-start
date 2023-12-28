package com.project.r2system.domain.data.services;

import com.project.r2system.api.commons.ArticleMapping;
import com.project.r2system.domain.data.entities.Article;
import com.project.r2system.domain.data.ArticleRepository;
import com.project.r2system.domain.data.payloads.responses.ArticleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private ArticleMapping articleMapping;
    public List<Article> allArticles() {
        return articleRepository.findAll();
    }

    public Article ArticleById(Integer idN) {
        return articleRepository.findByIdN(idN).orElse(null);
    }

    public String createArticle(Article article) {
        try {
            articleRepository.save(article);
            return "OK";
        } catch (Exception e) {
            return e.getCause().toString();
        }
    }
    public String updateArticle(Integer idN, ArticleResponse articleResponse) {
        try {
            Optional<Article> articleData = articleRepository.findByIdN(idN);
            if(articleData.isPresent()){
                Article _article = articleData.get();
                articleMapping.updateFromRequest(articleResponse,_article);
                articleRepository.save(_article);
                return "OK";
            }
            return "NOT_FOUND";
        }catch (Exception e) {
            return e.getCause().toString();
        }
    }
    public void deleteByIdN(Integer idN){
        articleRepository.deleteByIdN(idN);
    }
}
