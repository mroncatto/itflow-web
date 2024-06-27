package io.github.mroncatto.itflow.domain.device.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.github.mroncatto.itflow.domain.device.entity.DeviceComputer;
import io.github.mroncatto.itflow.domain.software.entity.Software;
import io.github.mroncatto.itflow.domain.software.entity.SoftwareLicenseKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Builder
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ComputerSoftwareResponseDto  implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Software software;

    private String license;

}
