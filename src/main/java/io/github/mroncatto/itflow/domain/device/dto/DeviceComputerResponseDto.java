package io.github.mroncatto.itflow.domain.device.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.github.mroncatto.itflow.domain.computer.entity.ComputerCategory;
import io.github.mroncatto.itflow.domain.device.entity.*;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DeviceComputerResponseDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    private ComputerCategory computerCategory;

    private String description;

    private boolean virtual;

    private String hostname;

    @ToString.Exclude
    @JsonIgnoreProperties({"deviceComputer"})
    private List<DeviceComputerCpu> computerCpuList;

    @ToString.Exclude
    @JsonIgnoreProperties({"deviceComputer"})
    private List<DeviceComputerMemory> computerMemoryList;

    @ToString.Exclude
    @JsonIgnoreProperties({"deviceComputer"})
    private List<DeviceComputerStorage> computerStorageList;

    @ToString.Exclude
    @JsonIgnoreProperties({"deviceComputer", "softwareLicenseKey"})
    private List<ComputerSoftwareResponseDto> computerSoftwareList;
}
