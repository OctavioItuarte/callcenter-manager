package app.controller.apiController;

import app.dto.FileDTO;
import app.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
            file.transferTo( Path.of(FILE_UPLOAD_PATH + file.getOriginalFilename()));
            fileService.fileRender(file.getOriginalFilename());
            return ResponseEntity.ok("Archivo CSV recibido y procesado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al procesar el archivo" + " " + e.getMessage());
        }
    }

    @PatchMapping("archived/{fileId}")
    public ResponseEntity<?> archiveFile(@PathVariable Long fileId) {
        try {
            fileService.toggleArchivedStatus(fileId);
            return ResponseEntity.ok().body("Estado del archivo cambiado correctamente");
        } catch (FileNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" No existe un archivo con el id " + fileId);
        }
    }

    @DeleteMapping("/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        Path filePath = Paths.get(FILE_UPLOAD_PATH, fileName);
        try {
            Files.deleteIfExists(filePath);
            this.fileService.deleteFileByName(fileName);
            return new ResponseEntity<>("Archivo eliminado con éxito", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("No se pudo eliminar el archivo", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

