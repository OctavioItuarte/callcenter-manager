package app.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.CSVWriter;
import com.opencsv.CSVWriterBuilder;
import com.opencsv.exceptions.CsvValidationException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Validated
public class FileProcessorService {


    public String convertCsvToJson(String csvFilePath) throws IOException, CsvValidationException {
        try (CSVReader reader = new CSVReaderBuilder(new FileReader(csvFilePath)).build()) {
            String[] header = reader.readNext();
            List<Map<String, String>> csvData = new ArrayList<>();

            String[] line;
            while ((line = reader.readNext()) != null) {
                Map<String, String> csvRecord = new HashMap<>();
                for (int i = 0; i < header.length; i++) {
                    csvRecord.put(header[i], line[i]);
                }
                csvData.add(csvRecord);
            }

            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(csvData);
        }
    }

    public void convertJsonToCsv(String jsonArray, String csvFilePath) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Map<String, String>> data = objectMapper.readValue(jsonArray, new TypeReference<List<Map<String, String>>>() {
        });

        try (CSVWriter writer = (CSVWriter) new CSVWriterBuilder(new FileWriter(csvFilePath)).build()) {
            // Write header
            if (!data.isEmpty()) {
                String[] header = data.get(0).keySet().toArray(new String[0]);
                writer.writeNext(header);
            }

            // Write data
            for (Map<String, String> row : data) {
                String[] line = row.values().toArray(new String[0]);
                writer.writeNext(line);
            }
        }
    }
}