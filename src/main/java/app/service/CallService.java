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

            callDTO.setDate(call.getDate());
            callDTO.setCallerName(call.getCallerName());
            callDTO.setCallerNumber(call.getCallerNumber());
            callDTO.setCalleeName(call.getCalleeName());
            callDTO.setCalleeNumber(call.getCalleeNumber());
            callDTO.setDod(call.getDod());
            callDTO.setDid(call.getDid());
            callDTO.setCallDuration(call.getCallDuration());
            callDTO.setTalkDuration(call.getTalkDuration());
            callDTO.setStatus(call.getStatus());
            callDTO.setSourceTrunk(call.getSourceTrunk());
            callDTO.setDestinationTrunk(call.getDestinationTrunk());
            callDTO.setComunicationType(call.getComunicationType());
            callDTO.setPin(call.getPin());
            callDTO.setCallerIpAddress(call.getCallerIpAddress());

            callDTOs.add(callDTO);
        }

        return callDTOs;

    }

    public List<CallDTO>getCallsByFileId(Long id){
        return this.goToDTO(this.callRepository.findByFileId(id));
    }

}
