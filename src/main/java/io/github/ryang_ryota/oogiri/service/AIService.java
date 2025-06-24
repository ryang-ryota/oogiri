package io.github.ryang_ryota.oogiri.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AIService {

    private final ChatClient chatClient;

    public AIService(ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    public List<String> generateThemes() {
        String prompt = "大喜利のお題を5つ、番号付きで生成してください。マークダウン記法は使わないでください。";
        return parseResponse(Objects.requireNonNull(chatClient.prompt().user(prompt).call().content()));
    }

    public List<String> generateResponses(String theme) {
        String prompt = "お題「" + theme + "」に対するシンプルで面白い回答を5つ、番号付きで生成してください。マークダウン記法は使わないでください。";
        return parseResponse(Objects.requireNonNull(chatClient.prompt().user(prompt).call().content()));
    }

    private List<String> parseResponse(String response) {
        return Arrays.stream(response.split("\\n"))
                .filter(line -> line.matches("\\d+\\..+"))
                .collect(Collectors.toList());
    }
}
