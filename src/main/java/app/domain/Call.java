package app.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import javax.validation.constraints.Size;
import java.time.Duration;
import java.time.LocalDate;

@Entity
@Table(name = "`call`")
public class Call {


    @Id
    private Long id;
    private LocalDate date;
    @Size(min = 1, max = 25)
    private String callerName;
    private Long callerNumber;
    private String calleeName;
    private String calleeNumber;
    private String dod;
    private String did;
    private Duration callDuration;
    private Duration TalkDuration;
    private String status;
    private String sourceTrunk;
    private String comunicationType;
    private Long pin;
    private String callerIpAddress;
    @ManyToOne
    private File file;



    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCallerName() {
        return callerName;
    }

    public void setCallerName(String callerName) {
        this.callerName = callerName;
    }

    public Long getCallerNumber() {
        return callerNumber;
    }

    public void setCallerNumber(Long callerNumber) {
        this.callerNumber = callerNumber;
    }

    public String getCalleeName() {
        return calleeName;
    }

    public void setCalleeName(String calleeName) {
        this.calleeName = calleeName;
    }

    public String getCalleeNumber() {
        return calleeNumber;
    }

    public void setCalleeNumber(String calleeNumber) {
        this.calleeNumber = calleeNumber;
    }

    public String getDod() {
        return dod;
    }

    public void setDod(String dod) {
        this.dod = dod;
    }

    public String getDid() {
        return did;
    }

    public void setDid(String did) {
        this.did = did;
    }

    public Duration getCallDuration() {
        return callDuration;
    }

    public void setCallDuration(Duration callDuration) {
        this.callDuration = callDuration;
    }

    public Duration getTalkDuration() {
        return TalkDuration;
    }

    public void setTalkDuration(Duration talkDuration) {
        TalkDuration = talkDuration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSourceTrunk() {
        return sourceTrunk;
    }

    public void setSourceTrunk(String sourceTrunk) {
        this.sourceTrunk = sourceTrunk;
    }

    public String getComunicationType() {
        return comunicationType;
    }

    public void setComunicationType(String comunicationType) {
        this.comunicationType = comunicationType;
    }

    public Long getPin() {
        return pin;
    }

    public void setPin(Long pin) {
        this.pin = pin;
    }

    public String getCallerIpAddress() {
        return callerIpAddress;
    }

    public void setCallerIpAddress(String callerIpAddress) {
        this.callerIpAddress = callerIpAddress;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
