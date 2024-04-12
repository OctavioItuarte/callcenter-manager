package app.service;


import app.domain.Call;
import app.domain.File;
import app.repository.CallRepository;
import app.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static app.controller.FileController.FILE_UPLOAD_PATH;

@Service
@Validated
public class FileService {

    @Autowired
    CallRepository callRepository;
    @Autowired
    FileRepository fileRepository;

    public void fileRender(String fileName) {



        try (BufferedReader br = new BufferedReader(new FileReader(FILE_UPLOAD_PATH + fileName))) {

            File file = new File();
            file.setUploadDate(LocalDate.now());
            file.setName(fileName);
            String line;
            int count = 1;

            fileRepository.save(file);
            while ((line = br.readLine()) != null) {

                count++;
                String[] parts = line.split(",");

                Call call = new Call();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                call.setDate(LocalDateTime.parse(parts[0],formatter));
                call.setCallerName(parts[1]);
                call.setCallerNumber(Long.valueOf(parts[2]));
                call.setCalleeName(parts[3]);
                call.setCalleeNumber(parts[4]);
                call.setDod(parts[5]);
                call.setDid(parts[6]);
                call.setCallDuration(Duration.parse(parts[7]));
                call.setTalkDuration(Duration.parse(parts[8]));
                call.setStatus(parts[9]);
                call.setSourceTrunk(parts[10]);
                call.setComunicationType(parts[11]);
                call.setPin(Long.valueOf(parts[12]));
                call.setCallerIpAddress(parts[13]);

                call.setFile(file);
                callRepository.save(call);

            }

            file.setRows(count);
            fileRepository.saveAndFlush(file);


        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}