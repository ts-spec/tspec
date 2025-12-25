// Mock NestJS decorators for testing
function Controller(path?: string): ClassDecorator {
  return () => {};
}
function Get(path?: string): MethodDecorator {
  return () => {};
}
function Post(path?: string): MethodDecorator {
  return () => {};
}
function Put(path?: string): MethodDecorator {
  return () => {};
}
function Param(name?: string): ParameterDecorator {
  return () => {};
}
function Body(): ParameterDecorator {
  return () => {};
}
function Query(): ParameterDecorator {
  return () => {};
}
function ApiTags(...tags: string[]): ClassDecorator {
  return () => {};
}
function ApiBearerAuth(name?: string): MethodDecorator & ClassDecorator {
  return () => {};
}
function ApiBasicAuth(name?: string): MethodDecorator & ClassDecorator {
  return () => {};
}
function ApiOAuth2(scopes?: string[], name?: string): MethodDecorator & ClassDecorator {
  return () => {};
}
function ApiSecurity(name: string, scopes?: string[]): MethodDecorator & ClassDecorator {
  return () => {};
}
// Custom composite decorator (simulating applyDecorators pattern)
function Auth(): MethodDecorator & ClassDecorator {
  return () => {};
}
function AdminAuth(): MethodDecorator & ClassDecorator {
  return () => {};
}

/**
 * 사용자 성별
 */
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

/**
 * 활동 레벨
 */
export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  MODERATELY_ACTIVE = 'MODERATELY_ACTIVE',
  VERY_ACTIVE = 'VERY_ACTIVE',
}

/**
 * 사용자 DTO
 */
export class UserDto {
  /**
   * 사용자 ID
   * @example 1
   */
  id!: number;

  /**
   * 이메일
   * @example "user@example.com"
   */
  email!: string | null;

  /**
   * 이름
   * @example "홍길동"
   */
  name!: string | null;

  /**
   * 나이
   * @minimum 0
   * @maximum 150
   * @example 25
   */
  age?: number;

  /**
   * 성별
   * @example "MALE"
   */
  gender?: Gender | null;

  /**
   * 활동 레벨
   * @example "MODERATELY_ACTIVE"
   */
  activityLevel?: ActivityLevel | null;

  /**
   * 생성일시
   */
  createdAt!: Date;

  /**
   * @deprecated 더 이상 사용하지 않음
   */
  legacyField?: string;
}

/**
 * 사용자 생성 DTO
 */
export class CreateUserDto {
  /**
   * 이메일
   * @example "newuser@example.com"
   * @pattern ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
   */
  email!: string;

  /**
   * 이름
   * @minLength 2
   * @maxLength 50
   * @example "김철수"
   */
  name!: string;

  /**
   * 비밀번호
   * @minLength 8
   */
  password!: string;

  /**
   * 메타데이터 (Record<string, unknown> 타입)
   */
  meta?: Record<string, unknown>;
}

/**
 * 단일 데이터 응답
 */
export class DataResponse<T> {
  data!: T;
}

/**
 * 페이지네이션 응답
 */
export class PaginatedResponse<T> {
  data!: T[];
  nextToken?: string | null;
  totalCount?: number | null;
}

/**
 * 사용자 목록 응답 DTO (배열 프로퍼티 테스트용)
 */
export class UserListResponseDto {
  /**
   * 사용자 목록
   */
  users!: UserDto[];

  /**
   * 총 개수
   */
  totalCount!: number;
}

/**
 * 사용자 목록 조회 쿼리 DTO
 */
export class ListUsersQueryDto {
  /**
   * 페이지네이션 토큰 (다음 페이지 조회용)
   * @example "eyJvZmZzZXQiOjAsImxpbWl0IjoyMH0="
   */
  nextToken?: string;

  /**
   * 조회할 아이템 개수 (기본값: 20, 최대: 100)
   * @minimum 1
   * @maximum 100
   * @default 20
   */
  limit?: number;

  /**
   * 시작 위치
   * @minimum 0
   * @default 0
   */
  offset?: number;

  /**
   * 이름 검색
   * @example "홍길동"
   */
  name?: string;
}

/**
 * 사용자 API 컨트롤러
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  /**
   * 사용자 목록 조회
   * @summary Get all users
   */
  @Get()
  findAll(@Query() query: ListUsersQueryDto): Promise<PaginatedResponse<UserDto>> {
    return Promise.resolve({ data: [], nextToken: null, totalCount: 0 });
  }

  /**
   * 사용자 상세 조회 (인증 필요)
   */
  @Get(':id')
  @ApiBearerAuth('bearerAuth')
  findOne(@Param('id') id: string): Promise<DataResponse<UserDto>> {
    return Promise.resolve({ data: {} as UserDto });
  }

  /**
   * 사용자 생성 (인증 필요 - 기본 이름)
   */
  @Post()
  @ApiBearerAuth()
  create(@Body() createUserDto: CreateUserDto): Promise<DataResponse<UserDto>> {
    return Promise.resolve({ data: {} as UserDto });
  }

  /**
   * 사용자 수정 (Basic Auth 필요)
   */
  @Put(':id')
  @ApiBasicAuth('basicAuth')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>,
  ): Promise<DataResponse<UserDto>> {
    return Promise.resolve({ data: {} as UserDto });
  }

  /**
   * OAuth2 테스트
   */
  @Get('oauth-test')
  @ApiOAuth2(['read', 'write'], 'oauth2Auth')
  oauthTest(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * 커스텀 시큐리티 테스트
   */
  @Get('custom-security')
  @ApiSecurity('apiKey', ['admin'])
  customSecurityTest(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * 사용자 목록 조회 (배열 프로퍼티 테스트용)
   */
  @Get('list')
  getList(): Promise<UserListResponseDto> {
    return Promise.resolve({ users: [], totalCount: 0 });
  }

  /**
   * 커스텀 Auth 데코레이터 테스트
   */
  @Get('protected')
  @Auth()
  protectedEndpoint(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * 커스텀 AdminAuth 데코레이터 테스트
   */
  @Get('admin-only')
  @AdminAuth()
  adminOnlyEndpoint(): Promise<void> {
    return Promise.resolve();
  }
}
