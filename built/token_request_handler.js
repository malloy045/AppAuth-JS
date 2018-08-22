"use strict";
/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = require("./errors");
var query_string_utils_1 = require("./query_string_utils");
var token_response_1 = require("./token_response");
var xhr_1 = require("./xhr");
/**
 * The default token request handler.
 */
var BaseTokenRequestHandler = /** @class */ (function () {
    function BaseTokenRequestHandler(requestor, utils) {
        if (requestor === void 0) { requestor = new xhr_1.JQueryRequestor(); }
        if (utils === void 0) { utils = new query_string_utils_1.BasicQueryStringUtils(); }
        this.requestor = requestor;
        this.utils = utils;
    }
    BaseTokenRequestHandler.prototype.isTokenResponse = function (response) {
        return response.error === undefined;
    };
    BaseTokenRequestHandler.prototype.performRevokeTokenRequest = function (configuration, request) {
        var revokeTokenResponse = this.requestor.xhr({
            url: configuration.revocationEndpoint,
            method: 'POST',
            dataType: 'json',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: this.utils.stringify(request.toStringMap())
        });
        return revokeTokenResponse.then(function (response) {
            return true;
        });
    };
    BaseTokenRequestHandler.prototype.performTokenRequest = function (configuration, request) {
        var _this = this;
        var tokenResponse = this.requestor.xhr({
            url: configuration.tokenEndpoint,
            method: 'POST',
            dataType: 'json',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: this.utils.stringify(request.toStringMap())
        });
        return tokenResponse.then(function (response) {
            if (_this.isTokenResponse(response)) {
                return token_response_1.TokenResponse.fromJson(response);
            }
            else {
                return Promise.reject(new errors_1.AppAuthError(response.error, token_response_1.TokenError.fromJson(response)));
            }
        });
    };
    return BaseTokenRequestHandler;
}());
exports.BaseTokenRequestHandler = BaseTokenRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Rva2VuX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUdILG1DQUFzQztBQUV0QywyREFBNkU7QUFHN0UsbURBQThGO0FBRTlGLDZCQUFpRDtBQWtCakQ7O0dBRUc7QUFDSDtJQUNFLGlDQUNvQixTQUE0QyxFQUM1QyxLQUFxRDtRQURyRCwwQkFBQSxFQUFBLGdCQUEyQixxQkFBZSxFQUFFO1FBQzVDLHNCQUFBLEVBQUEsWUFBOEIsMENBQXFCLEVBQUU7UUFEckQsY0FBUyxHQUFULFNBQVMsQ0FBbUM7UUFDNUMsVUFBSyxHQUFMLEtBQUssQ0FBZ0Q7SUFBRyxDQUFDO0lBRXJFLGlEQUFlLEdBQXZCLFVBQXdCLFFBQ2M7UUFDcEMsT0FBUSxRQUEyQixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDMUQsQ0FBQztJQUVELDJEQUF5QixHQUF6QixVQUNJLGFBQWdELEVBQ2hELE9BQTJCO1FBQzdCLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQVU7WUFDcEQsR0FBRyxFQUFFLGFBQWEsQ0FBQyxrQkFBa0I7WUFDckMsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUUsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7WUFDOUQsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsRCxDQUFDLENBQUM7UUFFSCxPQUFPLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDdEMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxREFBbUIsR0FBbkIsVUFBb0IsYUFBZ0QsRUFBRSxPQUFxQjtRQUEzRixpQkFrQkM7UUFoQkMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQW1DO1lBQ3ZFLEdBQUcsRUFBRSxhQUFhLENBQUMsYUFBYTtZQUNoQyxNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE9BQU8sRUFBRSxFQUFDLGNBQWMsRUFBRSxtQ0FBbUMsRUFBQztZQUM5RCxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xELENBQUMsQ0FBQztRQUVILE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDaEMsSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNsQyxPQUFPLDhCQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pDO2lCQUFNO2dCQUNMLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDakIsSUFBSSxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsMkJBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBN0NELElBNkNDO0FBN0NZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlscywgUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xyXG5pbXBvcnQge1Jldm9rZVRva2VuUmVxdWVzdH0gZnJvbSAnLi9yZXZva2VfdG9rZW5fcmVxdWVzdCc7XHJcbmltcG9ydCB7VG9rZW5SZXF1ZXN0fSBmcm9tICcuL3Rva2VuX3JlcXVlc3QnO1xyXG5pbXBvcnQge1Rva2VuRXJyb3IsIFRva2VuRXJyb3JKc29uLCBUb2tlblJlc3BvbnNlLCBUb2tlblJlc3BvbnNlSnNvbn0gZnJvbSAnLi90b2tlbl9yZXNwb25zZSc7XHJcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHtKUXVlcnlSZXF1ZXN0b3IsIFJlcXVlc3Rvcn0gZnJvbSAnLi94aHInO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIGludGVyZmFjZSB3aGljaCBjYW4gbWFrZSBhIHRva2VuIHJlcXVlc3QuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuUmVxdWVzdEhhbmRsZXIge1xyXG4gIC8qKlxyXG4gICAqIFBlcmZvcm1zIHRoZSB0b2tlbiByZXF1ZXN0LCBnaXZlbiB0aGUgc2VydmljZSBjb25maWd1cmF0aW9uLlxyXG4gICAqL1xyXG4gIHBlcmZvcm1Ub2tlblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCByZXF1ZXN0OiBUb2tlblJlcXVlc3QpOlxyXG4gICAgICBQcm9taXNlPFRva2VuUmVzcG9uc2U+O1xyXG5cclxuICBwZXJmb3JtUmV2b2tlVG9rZW5SZXF1ZXN0KFxyXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXHJcbiAgICAgIHJlcXVlc3Q6IFJldm9rZVRva2VuUmVxdWVzdCk6IFByb21pc2U8Ym9vbGVhbj47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCB0b2tlbiByZXF1ZXN0IGhhbmRsZXIuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmFzZVRva2VuUmVxdWVzdEhhbmRsZXIgaW1wbGVtZW50cyBUb2tlblJlcXVlc3RIYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHVibGljIHJlYWRvbmx5IHJlcXVlc3RvcjogUmVxdWVzdG9yID0gbmV3IEpRdWVyeVJlcXVlc3RvcigpLFxyXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHMgPSBuZXcgQmFzaWNRdWVyeVN0cmluZ1V0aWxzKCkpIHt9XHJcblxyXG4gIHByaXZhdGUgaXNUb2tlblJlc3BvbnNlKHJlc3BvbnNlOiBUb2tlblJlc3BvbnNlSnNvbnxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBUb2tlbkVycm9ySnNvbik6IHJlc3BvbnNlIGlzIFRva2VuUmVzcG9uc2VKc29uIHtcclxuICAgIHJldHVybiAocmVzcG9uc2UgYXMgVG9rZW5FcnJvckpzb24pLmVycm9yID09PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBwZXJmb3JtUmV2b2tlVG9rZW5SZXF1ZXN0KFxyXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXHJcbiAgICAgIHJlcXVlc3Q6IFJldm9rZVRva2VuUmVxdWVzdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgbGV0IHJldm9rZVRva2VuUmVzcG9uc2UgPSB0aGlzLnJlcXVlc3Rvci54aHI8Ym9vbGVhbj4oe1xyXG4gICAgICB1cmw6IGNvbmZpZ3VyYXRpb24ucmV2b2NhdGlvbkVuZHBvaW50LFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJywgIC8vIGFkZGluZyBpbXBsaWNpdCBkYXRhVHlwZVxyXG4gICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuICAgICAgZGF0YTogdGhpcy51dGlscy5zdHJpbmdpZnkocmVxdWVzdC50b1N0cmluZ01hcCgpKVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJldm9rZVRva2VuUmVzcG9uc2UudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwZXJmb3JtVG9rZW5SZXF1ZXN0KGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgcmVxdWVzdDogVG9rZW5SZXF1ZXN0KTpcclxuICAgICAgUHJvbWlzZTxUb2tlblJlc3BvbnNlPiB7XHJcbiAgICBsZXQgdG9rZW5SZXNwb25zZSA9IHRoaXMucmVxdWVzdG9yLnhocjxUb2tlblJlc3BvbnNlSnNvbnxUb2tlbkVycm9ySnNvbj4oe1xyXG4gICAgICB1cmw6IGNvbmZpZ3VyYXRpb24udG9rZW5FbmRwb2ludCxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsICAvLyBhZGRpbmcgaW1wbGljaXQgZGF0YVR5cGVcclxuICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXHJcbiAgICAgIGRhdGE6IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3QudG9TdHJpbmdNYXAoKSlcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0b2tlblJlc3BvbnNlLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICBpZiAodGhpcy5pc1Rva2VuUmVzcG9uc2UocmVzcG9uc2UpKSB7XHJcbiAgICAgICAgcmV0dXJuIFRva2VuUmVzcG9uc2UuZnJvbUpzb24ocmVzcG9uc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdDxUb2tlblJlc3BvbnNlPihcclxuICAgICAgICAgICAgbmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5lcnJvciwgVG9rZW5FcnJvci5mcm9tSnNvbihyZXNwb25zZSkpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==