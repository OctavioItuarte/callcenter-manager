package app.dto;

import app.domain.Call;


import java.time.LocalDateTime;

public class CallDTO {

    private LocalDateTime date;

    private String callerName;
    private String callerNumber;
    private String calleeName;
    private String calleeNumber;
    private String dod;
    private String did;
    private String callDuration;
    private String TalkDuration;
    private String status;
    private String sourceTrunk;
    private String destinationTrunk;
    private String comunicationType;
    private Long pin;
    private String callerIpAddress;

    public CallDTO() {

    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getCallerName() {
        return callerName;
    }

    public void setCallerName(String callerName) {
        this.callerName = callerName;
    }

    public String getCallerNumber() {
        return callerNumber;
    }

    public void setCallerNumber(String callerNumber) {
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

    public String getCallDuration() {
        return callDuration;
    }

    public void setCallDuration(String callDuration) {
        this.callDuration = callDuration;
    }

    public String getTalkDuration() {
        return TalkDuration;
    }

    public void setTalkDuration(String talkDuration) {
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

    public String getDestinationTrunk() {
        return destinationTrunk;
    }

    public void setDestinationTrunk(String destinationTrunk) {
        this.destinationTrunk = destinationTrunk;
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
}
