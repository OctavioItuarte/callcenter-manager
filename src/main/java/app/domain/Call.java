package app.domain;

import jakarta.persistence.*;

import javax.validation.constraints.Size;


@Entity
@Table(name = "`call`")
public class Call {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String time;
    @Size(min = 1, max = 25)
    private String caller;
    private String callee;
    private String sourceTrunk;
    private String destinationTrunk;
    private String duration;
    private String billingDuration;
    private String disposition;
    private String communicationType;
    private String pinUser;
    @ManyToOne
    private File file;



    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getTime() {

        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getCaller() {
        return caller;
    }

    public void setCaller(String caller) {
        this.caller = caller;
    }

    public String getCallee() {
        return callee;
    }

    public void setCallee(String callee) {
        this.callee = callee;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getBillingDuration() {
        return billingDuration;
    }

    public void setBillingDuration(String billingDuration) {
        this.billingDuration = billingDuration;
    }

    public String getDisposition() {
        return disposition;
    }

    public void setDisposition(String disposition) {
        this.disposition = disposition;
    }

    public String getSourceTrunk() {
        return sourceTrunk;
    }

    public void setSourceTrunk(String sourceTrunk) {
        this.sourceTrunk = sourceTrunk;
    }

    public String getDestinationTrunk() {
        return destinationTrunk;
    }

    public void setDestinationTrunk(String destinationTrunk) {
        this.destinationTrunk = destinationTrunk;
    }

    public String getCommunicationType() {
        return communicationType;
    }

    public void setCommunicationType(String communicationType) {
        this.communicationType = communicationType;
    }

    public String getPinUser() {
        return pinUser;
    }

    public void setPinUser(String pinUser) {
        this.pinUser = pinUser;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
