package io.github.mroncatto.itflow.domain.device.dto;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.github.mroncatto.itflow.domain.company.entity.Department;
import io.github.mroncatto.itflow.domain.device.entity.DeviceCategory;
import io.github.mroncatto.itflow.domain.device.entity.DeviceComputer;
import io.github.mroncatto.itflow.domain.device.entity.DeviceStaff;
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
public class DeviceFindOneResponseDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    private String code;

    private String tag;

    private String serialNumber;

    private String description;

    private String hostname;

    private DeviceCategory deviceCategory;

    private Department department;

    private boolean hasStaff;

    private boolean hasComputer;

    private boolean active;

}
