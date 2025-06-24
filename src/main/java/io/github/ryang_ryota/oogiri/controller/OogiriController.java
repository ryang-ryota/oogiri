package io.github.ryang_ryota.oogiri.controller;

import io.github.ryang_ryota.oogiri.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class OogiriController {

    @Autowired
    private final AIService aiService;

    @MessageMapping("/request-themes")
    @SendTo("/topic/themes")
    public List<String> getThemes() {
        return aiService.generateThemes();
    }

    @MessageMapping("/submit-theme")
    @SendTo("/topic/responses")
    public List<String> getResponses(String theme) {
        return aiService.generateResponses(theme);
    }
}
