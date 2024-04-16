package app.controller.apiController;

import app.dto.CallDTO;
import app.dto.FileDTO;
import app.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/files")
public class ApiFileController {

    @Autowired
    private FileService fileService;
    public final static String FILE_UPLOAD_PATH = "src/main/resources/static/";

    @GetMapping("")
    public ResponseEntity<?> getFiles() {
        List<FileDTO> calls = fileService.getFiles();
        if (calls.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(calls);
    }


    @PostMapping("")
    public ResponseEntity<?> uploadFile(@RequestParam("csvFile") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Archivo no seleccionado");
        }

        try {
            file.transferTo( Path.of(FILE_UPLOAD_PATH + file.getName()));
            fileService.fileRender(file.getName());
            return ResponseEntity.ok("Archivo CSV recibido y procesado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el archivo");
        }
    }
}

