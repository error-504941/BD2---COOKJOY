package com.cooking.service.repository;

import com.cooking.service.model.Instruction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InstructionRepository extends MongoRepository<Instruction, String> {
    // Additional query methods can be defined here
}
