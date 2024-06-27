package io.github.mroncatto.itflow.domain.device.model;

import io.github.mroncatto.itflow.domain.commons.exception.BadRequestException;
import io.github.mroncatto.itflow.domain.device.dto.DeviceStaffRequestDto;
import io.github.mroncatto.itflow.domain.device.dto.DeviceStaffResponseDto;
import io.github.mroncatto.itflow.domain.device.entity.Device;
import io.github.mroncatto.itflow.domain.device.entity.DeviceStaff;
import jakarta.persistence.NoResultException;
import org.springframework.validation.BindingResult;

public interface IDeviceStaffService {
    DeviceStaffResponseDto updateStaff(DeviceStaffRequestDto deviceStaffRequestDto, Long id, BindingResult result) throws BadRequestException;
    DeviceStaffResponseDto getStaffFromDevice(Long id);
    Device deleteStaffFromDevice(Long id) throws NoResultException;
}
