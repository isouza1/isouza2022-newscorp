package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// Add imports
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
class MoviesController {

    @Value("${sm://themoviedbapikey}")
    private String MOVIES_API_KEY;

    @Value("${BASE_URL}")
    private String BASE_URL;

    @Value("${MOVIES_DB_URL}")
    private String MOVIES_DB_URL;

    @Value("${MOVIES_GENRE_URL}")
    private String MOVIES_GENRE_URL;

    @GetMapping("/api/movies-list")
    public String listMovies() {
        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + MOVIES_DB_URL.replaceAll("MOVIES_API_KEY", MOVIES_API_KEY);
        String result = restTemplate.getForObject(url,
                String.class);
        return result;
    }

    @GetMapping("/api/genres-list")
    public String listGenres() {
        RestTemplate restTemplate = new RestTemplate();
        String url = BASE_URL + MOVIES_GENRE_URL.replaceAll("MOVIES_API_KEY", MOVIES_API_KEY);
        String result = restTemplate.getForObject(url,
                String.class);
        return result;
    }

    // GCP will keep restarting if you don't have this ...
    @RequestMapping("/liveness_check")
    public ResponseEntity<String> healthCheck() {
        System.out.println("********************************");
        System.out.println("CALLED liveness_check");
        System.out.println("********************************");
        return new ResponseEntity<>("Healthy", HttpStatus.OK);
    }

}