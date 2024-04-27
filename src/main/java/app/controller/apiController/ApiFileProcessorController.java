package app.controller.apiController;


import app.service.FileProcessorService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/filesProcessor")
public class ApiFileProcessorController {

    @Autowired
    private FileProcessorService fileProcessorService;
    public final static String FILE_CREATION_PATH = "src/main/resources/static/exportedCsv";


    @PostMapping("tocsv")
    public ResponseEntity convertJsonToCsv(@RequestBody() String json) {
        try {
            if (json == null || json.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No JSON data provided");
            }
            System.out.println(json);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(json);
            JsonNode dataNode = jsonNode.get("data");
            String data = dataNode.toString();
            System.out.println(data);
            String csvFileName = "output.csv";
            String csvFilePath = FILE_CREATION_PATH + csvFileName;
            fileProcessorService.convertJsonToCsv(data, csvFilePath);

            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + csvFileName);

            InputStreamResource resource = new InputStreamResource(new FileInputStream(csvFilePath));

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(Files.size(Paths.get(csvFilePath)))
                    .contentType(MediaType.parseMediaType("application/csv"))
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el archivo" + " " + e.getMessage());
        }
    }

    @PostMapping("tojson")
    public ResponseEntity<?> convertCsvToJson(@RequestParam("csvFile") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Archivo no seleccionado");
        }

        try {
            String csvFilePath = FILE_CREATION_PATH + file.getOriginalFilename();
            file.transferTo(Path.of(csvFilePath));
            String jsonData = fileProcessorService.convertCsvToJson(csvFilePath);
            return ResponseEntity.ok(jsonData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el archivo" + " " + e.getMessage());
        }
    }
}
