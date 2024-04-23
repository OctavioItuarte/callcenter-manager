package app.service;


import app.domain.Call;
import app.domain.File;
import app.dto.CallDTO;
import app.dto.FileDTO;
import app.repository.CallRepository;
import app.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


import static app.controller.apiController.ApiFileController.FILE_UPLOAD_PATH;

@Service
@Validated
public class FileService {

    @Autowired
    CallRepository callRepository;
    @Autowired
    FileRepository fileRepository;

    private List<FileDTO> goToDTO(List<File> files) {
        List<FileDTO> fileDTOs = new ArrayList<>();
        for (File file : files) {
            FileDTO fileDTO = new FileDTO(file);
            fileDTOs.add(fileDTO);
        }
        return fileDTOs;
    }

    public List<FileDTO> getFiles(){
        return this.goToDTO(fileRepository.findAll());

    }


    public void fileRender(String fileName) {

        if (fileRepository.existsByName(fileName)) {
            throw new IllegalArgumentException("Ya existe un archivo con el nombre '" + fileName + "'");
        }

        File file = new File();
        file.setUploadDate(LocalDate.now());
        file.setName(fileName);
        file.setHasError(false);
        file.setArchived(false);

        try (BufferedReader br = new BufferedReader(new FileReader(FILE_UPLOAD_PATH + fileName))) {


            String line;
            int count = 1;

            boolean firstLine = true;

            fileRepository.save(file);
            while ((line = br.readLine()) != null) {

                String[] parts = line.split(",");
                if(firstLine){
                    firstLine = false;
                    continue;
                }

                boolean allEmpty = true;
                for (String part : parts) {
                    if (!part.trim().isEmpty()) {
                        allEmpty = false;
                        break;
                    }
                }

                if (allEmpty) {
                    break;
                }

                count++;


                Call call = new Call();


                call.setTime((parts[0] .replaceAll("^\"|\"$", "") ));
                call.setCaller(parts[1] .replaceAll("^\"|\"$", "") );
                call.setCallee(parts[2] .replaceAll("^\"|\"$", "") );
                call.setSourceTrunk(parts[3].replaceAll("^\"|\"$", "") );
                call.setDestinationTrunk(parts[4] .replaceAll("^\"|\"$", "") );
                call.setDuration(parts[5] .replaceAll("^\"|\"$", "") );
                call.setBillingDuration(parts[6] .replaceAll("^\"|\"$", "") );
                call.setDisposition(parts[7] .replaceAll("^\"|\"$", "") );
                call.setComunicationType(parts[8] .replaceAll("^\"|\"$", "") );
                call.setPinUser((parts[9] .replaceAll("^\"|\"$", "") ));
                call.setFile(file);
                callRepository.save(call);

            }

            file.setRows(count);
            fileRepository.saveAndFlush(file);


        } catch (IOException e) {
            file.setHasError(true);
            file.setArchived(true);
            fileRepository.save(file);

            System.err.println("Se produjo un error al procesar el archivo: " + e.getMessage());

            e.printStackTrace();

            throw new RuntimeException(e);
        }

    }

    public void toggleArchivedStatus(Long fileId) throws FileNotFoundException {
        File file = fileRepository.findById(fileId).orElseThrow(() -> new FileNotFoundException("No existe un file con ese id " + fileId));

        file.setArchived(!file.isArchived());

        fileRepository.save(file);
    }
}

