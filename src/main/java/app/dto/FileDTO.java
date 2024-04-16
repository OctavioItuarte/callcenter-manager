package app.dto;


import app.domain.File;

import java.time.LocalDate;

public class FileDTO {

    private String name;
    private LocalDate uploadDate;

    private Integer rows;

    public FileDTO(File file) {
        this.name = file.getName();
        this.uploadDate = file.getUploadDate() ;
        this.rows = file.getRows();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDate uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }
}
