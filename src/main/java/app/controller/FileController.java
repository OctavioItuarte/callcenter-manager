package app.controller;

import app.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

@RestController
@RequestMapping("/files")
public class FileController {

    @Autowired
    private FileService fileService;
    public final static String FILE_UPLOAD_PATH = "src/main/resources/static/";


    @PostMapping("")
    public ResponseEntity<?> uploadFile(@RequestParam("csvFile") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Archivo no seleccionado");
        }

        try {
            file.transferTo( Path.of(FILE_UPLOAD_PATH));
            fileService.fileRender(file.getName());
            return ResponseEntity.ok("Archivo CSV recibido y procesado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el archivo");
        }
    }
}

