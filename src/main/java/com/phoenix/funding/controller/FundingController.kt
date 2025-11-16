package com.phoenix.funding.controller

import com.phoenix.funding.model.FundRequest
import com.phoenix.funding.model.FundResponse
import com.phoenix.funding.service.FundService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/funds")
class FundController(
    private val fundService: FundService
) {

    @GetMapping
    fun getFunds(): List<FundResponse> =
        fundService.getAllFunds()

    @GetMapping("/{id}")
    fun getFund(@PathVariable id: String): FundResponse =
        fundService.getFund(id)

}