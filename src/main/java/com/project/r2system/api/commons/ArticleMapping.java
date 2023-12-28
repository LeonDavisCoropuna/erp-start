package com.project.r2system.api.commons;

import com.project.r2system.domain.data.entities.Article;
import com.project.r2system.domain.data.entities.EType;
import com.project.r2system.domain.data.payloads.responses.ArticleResponse;
import com.project.r2system.domain.data.services.CategoryService;
import com.project.r2system.domain.data.services.MeasureService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class ArticleMapping {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private MeasureService measureService;
    @Autowired
    private ModelMapper modelMapper;

    public ArticleResponse maptoReponse(Article article) {
        ArticleResponse articleResponse = modelMapper.map(article, ArticleResponse.class);
        articleResponse.setCategoria(categoryService.CategoryById(article.getCategoria()).getNombre());
        articleResponse.setMedida(measureService.MeasureById(article.getMedida()).getNombre());
        articleResponse.setEstado(article.getEstado() ? "Activo" : "Inactivo");
        return articleResponse;
    }
    public Article createFromRequest(ArticleResponse articleResponse){
        Article _article = modelMapper.map(articleResponse, Article.class);
        _article.setCategoria(categoryService.CategoryByNombre(articleResponse.getCategoria()).getIdN());
        _article.setTipo(EType.valueOf(articleResponse.getTipo()));
        _article.setMedida(measureService.MeasureByNombre(articleResponse.getMedida()).getIdN());
        _article.setEstado(articleResponse.getEstado() == "Activo" ? true : false);
        return _article;
    }
    public void updateFromRequest(ArticleResponse articleResponse, Article article){
        article.setNombre(articleResponse.getNombre());
        article.setPrecio(articleResponse.getPrecio());
        article.setImpuesto(articleResponse.getImpuesto());
        article.setStock(articleResponse.getStock());
        article.setStockMin(articleResponse.getStockMin());
        article.setStockMax(articleResponse.getStockMax());
        article.setCategoria(categoryService.CategoryByNombre(articleResponse.getCategoria()).getIdN());
        article.setTipo(EType.valueOf(articleResponse.getTipo()));
        article.setMedida(measureService.MeasureByNombre(articleResponse.getMedida()).getIdN());
        article.setEstado(articleResponse.getEstado() == "Activo" ? true : false);
    }
}
