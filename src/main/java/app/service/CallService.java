package app.service;

import app.domain.Call;
import app.repository.CallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CallService {

    @Autowired
    private CallRepository callRepository;

    public List<Call>getCallsByFileId(Long id){
        return this.callRepository.findByFileId(id);
    }

}
