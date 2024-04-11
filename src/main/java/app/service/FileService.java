package app.service;


import app.domain.Call;
import app.repository.CallRepository;
import app.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDate;

@Service
public class FileService {

    @Autowired
    CallRepository callRepository;
    @Autowired
    FileRepository fileRepository;

    public void fileRender(String filePath) {

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            // Lee cada línea del archivo CSV
            while ((line = br.readLine()) != null) {
                // Separa la línea en sus campos, asumiendo que están separados por comas
                String[] parts = line.split(",");

                // Crea una nueva entidad Call con los datos de la línea y agrégala a la lista
                Call call = new Call();
                call.setDate(LocalDate.parse(parts[0]));
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



            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}