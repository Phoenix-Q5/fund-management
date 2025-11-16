package com.phoenix.funding.controller

import com.phoenix.funding.model.InvestmentRequest
import com.phoenix.funding.model.InvestmentResponse
import com.phoenix.funding.service.InvestmentService
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
@RequestMapping("/api")
class InvestmentController(
    private val investmentService: InvestmentService
) {

    @GetMapping("/funds/{fundId}/investments")
    fun getInvestmentsForFund(@PathVariable fundId: String): List<InvestmentResponse> =
        investmentService.getInvestmentsForFund(fundId)

    @GetMapping("/investments/{investmentId}")
    fun getInvestment(@PathVariable investmentId: String): InvestmentResponse =
        investmentService.getInvestment(investmentId)

    @PostMapping("/funds/{fundId}/investments")
    fun createInvestment(
        @PathVariable fundId: String,
        @RequestBody request: InvestmentRequest
    ): ResponseEntity<InvestmentResponse> {
        val created = investmentService.createInvestment(fundId, request)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @PutMapping("/investments/{investmentId}")
    fun updateInvestment(
        @PathVariable investmentId: String,
        @RequestBody request: InvestmentRequest
    ): InvestmentResponse =
        investmentService.updateInvestment(investmentId, request)

    @DeleteMapping("/investments/{investmentId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteInvestment(@PathVariable investmentId: String) {
        investmentService.deleteInvestment(investmentId)
    }
}