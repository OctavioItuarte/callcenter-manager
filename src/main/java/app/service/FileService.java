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
                    break; //
                }

                count++;


                Call call = new Call();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                call.setDate(LocalDateTime.parse(parts[0],formatter));
                call.setCallerName(parts[1]);
                call.setCallerNumber(parts[2]);
                call.setCalleeName(parts[3]);
                call.setCalleeNumber(parts[4]);
                call.setDod(parts[5]);
                call.setDid(parts[6]);
                call.setCallDuration(parts[7]);
                call.setTalkDuration(parts[8]);
                call.setStatus(parts[9]);
                call.setSourceTrunk(parts[10]);
                call.setDestinationTrunk(parts[11]);
                call.setComunicationType(parts[12]);
                if (parts.length > 13 && !parts[13].isEmpty())
                    call.setPin(Long.valueOf(parts[13]));
                if (parts.length > 14 && !parts[14].isEmpty())
                    call.setCallerIpAddress(parts[14]);

                call.setFile(file);
                callRepository.save(call);

            }

            file.setRows(count);
            fileRepository.saveAndFlush(file);


        } catch (IOException e) {
            file.setHasError(true);
            file.setArchived(true);
            fileRepository.save(file);
            
            throw new RuntimeException(e);
        }

    }

    public void toggleArchivedStatus(Long fileId) throws FileNotFoundException {
        File file = fileRepository.findById(fileId).orElseThrow(() -> new FileNotFoundException("No existe un file con ese id " + fileId));

        file.setArchived(!file.isArchived());

        fileRepository.save(file);
    }
}

