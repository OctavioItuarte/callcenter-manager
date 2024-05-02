package app.service;

import app.domain.Call;
import app.dto.CallDTO;
import app.repository.CallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CallService {

    @Autowired
    private CallRepository callRepository;

    private List<CallDTO> goToDTO(List<Call> calls) {
        List<CallDTO> callDTOs = new ArrayList<>();
        for (Call call : calls) {
            CallDTO callDTO = new CallDTO();

            callDTO.setTime(call.getTime());
            callDTO.setCallee(call.getCallee());
            callDTO.setCaller(call.getCaller());
            callDTO.setDestinationTrunk(call.getDestinationTrunk());
            callDTO.setSourceTrunk(call.getSourceTrunk());
            callDTO.setDuration(call.getDuration());
            callDTO.setComunicationType(call.getComunicationType());
            callDTO.setDisposition(call.getDisposition());
            callDTO.setBillingDuration(call.getBillingDuration());
            callDTO.setPinUser(call.getPinUser());

            callDTOs.add(callDTO);
        }

        return callDTOs;

    }

    public List<CallDTO> getCallsBySourceTrunkOrDestinationTrunk(String trunk) { return this.goToDTO(callRepository.findBySourceTrunkOrderByDestinationTrunk(trunk));}

    public List<CallDTO>getCallsByFileId(Long id){
        return this.goToDTO(this.callRepository.findByFileId(id));
    }

    public List<CallDTO>getAllCalls(){
        return this.goToDTO(this.callRepository.findAll());
    }

}
